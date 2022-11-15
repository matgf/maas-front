<script setup>

import axios from 'axios';
import { reactive, ref } from 'vue';

const services = reactive({});
const currentService = ref(0);
const datesShifts = reactive({});
// const count = ref(0);

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
        }
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
    console.log(datesShifts);
    console.log(result.data.data.service.orderedShifts);
  });
};
</script>

<template>

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

<table v-for="lel in datesShifts.value" :key='lel.dates'
  class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">{{ lel.dates}}</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</template>

<style>

</style>
