import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import StudentDashboard from '../views/StudentDashboard.vue';
import WykladowcaDashboard from '../views/WykladowcaDashboard.vue';

// Funkcja sprawdzająca, czy użytkownik jest zalogowany
const isAuthenticated = () => {
  return sessionStorage.getItem('token') !== null;
};

// Funkcja sprawdzająca rolę użytkownika
const getUserRole = () => {
  return sessionStorage.getItem('userRole'); // 'student' lub 'wykladowca'
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/student',
      name: 'student-dashboard',
      component: StudentDashboard,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next('/login'); // Przekierowanie na stronę logowania, jeśli nie ma tokena
        } else if (getUserRole() !== 'student') {
          next('/'); // Przekierowanie na stronę główną, jeśli rola jest nieprawidłowa
        } else {
          next();
        }
      },
    },
    {
      path: '/wykladowca',
      name: 'wykladowca-dashboard',
      component: WykladowcaDashboard,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next('/login');
        } else if (getUserRole() !== 'wykladowca') {
          next('/');
        } else {
          next();
        }
      },
    },
  ],
});

// Middleware: Przekierowanie na login, jeśli użytkownik nie jest zalogowany
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
