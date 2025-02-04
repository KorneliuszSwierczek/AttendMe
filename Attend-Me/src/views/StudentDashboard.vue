<template>
    <div>
      <h1>Panel Studenta</h1>
      <p>Witaj, {{ user.name }}!</p>
      <button @click="logout">Wyloguj</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import  AttendMeBackendClientBase  from '@/services/api';
  
  const user = ref({});
  const router = useRouter();
  
  const fetchUser = async () => {
    user.value = await AttendMeBackendClientBase.userGet(undefined);
  };
  
  const logout = () => {
    sessionStorage.clear();
    router.push('/login');
  };
  
  onMounted(fetchUser);
  </script>
  