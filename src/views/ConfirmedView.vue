<script setup>

import axios from 'axios';
import { reactive, ref } from 'vue';
import moment from 'moment';

const services = reactive({});
const currentService = ref(0);
const datesShifts = reactive({});
const engineers = reactive({});

axios({
  url: 'http://localhost:3001/graphql',
  method: 'post',
  data: {
    query: `
      query {
          allServices {
              id
              name

          }
      }
    `,
  },
}).then((result) => {
  services.value = result.data.data.allServices;
});

const selectService = (e) => {
  currentService.value = e.currentTarget.id;
  axios({
    url: 'http://localhost:3001/graphql',
    method: 'post',
    data: {
      query: `
        query ($id: ID){
            service(id: $id){
                id
                name
                orderedShifts {
                dates
                shifts {
                    id
                    assigned
                    date
                    serviceId
                    startTime
                    engineerId
                    endTime
                  shiftEngineers {
                        id
                        engineerId
                        shiftId
                    }
                    }
                }
                engineers {
                    id
                    firstName
                    lastName
                    serviceId
                }
            }
        }
    `,
      variables: {
        id: currentService.value,
      },
    },
  }).then((result) => {
    datesShifts.value = result.data.data.service.orderedShifts;
    engineers.value = result.data.data.service.engineers;
    console.log(result.data.data.service.orderedShifts);
  });
};
const checkShiftEngineer = (engineerId, engineersService) => {
  const engineerName = engineersService.find((es) => es.id === engineerId);
  return `${engineerName.firstName} ${engineerName.lastName}.`;
};
</script>

<template>

<h1> Confirmed Shifts</h1>
<!-- Service Dropdown -->
<div class="btn-group">
  <button type="button" class="btn btn-success dropdown-toggle"
  data-bs-toggle="dropdown" aria-expanded="false">
    Select service
  </button>
  <ul class="dropdown-menu">
    <li v-for="service in services.value" :id='service.id' :onClick='selectService'
    :key="service.id">
      <a class="dropdown-item">
        {{ service.name }}
      </a>
    </li>
  </ul>
</div>
{{currentService}}

<!-- Tables -->
<table v-for="(date) in datesShifts.value" :key='date.dates'
  class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th :colSpan=2 scope="col">{{ date.dates}}</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="shift in date.shifts" :key='shift.id'>
      <td scope="row">
        {{moment(shift.startTime).format('HH:mm')}} - {{ moment(shift.endTime).format('HH:mm')}}
      </td>

      <td>
        <div v-if="shift.assigned"> {{checkShiftEngineer(shift.engineerId, engineers.value)}}</div>
        <font-awesome-icon v-else :icon="['fas', 'triangle-exclamation']" />
      </td>
    </tr>
  </tbody>
</table>
</template>

<style>

</style>
