
<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login" v-if="!identity">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account?.picture || identity?.picture">
            <img :src="account?.picture || identity?.picture" alt="account photo" height="40" class="rounded" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';

export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      identity: computed(() => AppState.user),
      async login() {
        try {
          await AuthService.loginWithRedirect()
        } catch (error) {
          console.error('[LOGIN ERROR]', error)
        }
      },
      async logout() {
        try {
          await AuthService.logout()
        } catch (error) {
          console.error('[LOGOUT ERROR]', error)
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped></style>
