<template>
    <div >
        <h1>Login</h1>
        <div class="card">
        <div>
            <input type="text" placeholder="Username"/>
        </div>
        <div>
            <input type="password" placeholder="Password"/>
        </div>
        </div>
        <div>
            <button @click="loged && $router.push({name : 'home'})":disabled="!loged">Login</button>
        </div>
        <div>
        <p>Do not have an account yet ?</p>
        <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            loged : true,
        }
    },
    methods : {
        logedIn(){
            this.loged = true;
        }
    },
}
</script>