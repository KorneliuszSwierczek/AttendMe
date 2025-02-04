<template>
    <div class="login-container">
      <h2>Zaloguj się</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="loginName" placeholder="Login" required />
        <input type="password" v-model="password" placeholder="Hasło" required />
        <button type="submit">Zaloguj</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import  AttendMeBackendClientBase  from '@/services/api'; // Import API klienta
  
  const loginName = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await AttendMeBackendClientBase.userLogin(loginName.value, password.value);
      if (response.token) {
        sessionStorage.setItem('token', response.token); // Zapisanie tokenu w sessionStorage
        await fetchUserData();
      }
    } catch (error) {
      errorMessage.value = 'Nieprawidłowy login lub hasło';
    }
  };
  
  const fetchUserData = async () => {
    try {
      const user = await AttendMeBackendClientBase.userGet(undefined);
      sessionStorage.setItem('userRole', user.role); // Zapisujemy rolę użytkownika
      if (user.role === 'student') {
        router.push('/student');
      } else if (user.role === 'wykladowca') {
        router.push('/wykladowca');
      }
    } catch (error) {
      errorMessage.value = 'Nie udało się pobrać danych użytkownika';
    }
  };
  </script>
  
  <style scoped>
  /* Stylowanie formularza */
  </style>
  