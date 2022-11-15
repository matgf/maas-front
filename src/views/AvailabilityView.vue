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

const checkShiftEngineer = (engineerId, shiftEngineers) => shiftEngineers.find((es) => es.engineerId === parseInt(engineerId, 10));

const changeShiftEngineer = (e, shiftId, engineerId) => {
  console.log(shiftId);
  console.log(engineerId);
  if (e.target.checked) {
    // createShiftEngineer()
    axios({
      url: 'http://localhost:3001/graphql',
      method: 'post',
      data: {
        query: `
          mutation CreateShiftEngineer($input: CreateShiftEngineerInput!){
              CreateShiftEngineer(input: $input) {
                shiftEngineer {
                      id
                      shiftId
                      engineerId
                  }

              }
          }
    `,
        variables: {
          input: {
            shiftEngineer: {
              shiftId,
              engineerId,
            },
          },
        },
      },
    }).then((result) => {
      debugger;
    });
  } else {
  // destroyShiftEngineer()
  }
};
</script>

<template>

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
<table v-for="(date, index) in datesShifts.value" :key='date.dates'
  class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">{{ date.dates}}</th>

      <th v-for="engineer in engineers.value" :key='engineer.id' :id='engineer.id' scope="col">
        {{engineer.firstName}} {{engineer.lastName}}

      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="shift in date.shifts" :key='shift.id'>
      <td scope="row">
        {{moment(shift.startTime).format('HH:mm')}} - {{ moment(shift.endTime).format('HH:mm')}}
        </td>
      <td v-for="engineer in engineers.value"
        :key="'idx_' + engineer.id + '_' + index" :id="'idx_' + shift.id + '_' + index">
        <div class="form-check" >
          <label class="form-check-label" for="flexCheckChecked" >
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
          @click='e => changeShiftEngineer(e, shift.id, engineer.id)' :checked='checkShiftEngineer(engineer.id, shift.shiftEngineers)'>
          </label>
        </div>
      </td>
    </tr>
  </tbody>
</table>
</template>

<style>

</style>
