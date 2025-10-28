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
            <button class="button button--disabled" @click="logedIn">Login</button>
        </div>
        <div>
        <p>Do not have an account yet ?</p>
        <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        </div>
    </div>
</template>
<script>
export default {
    components : {
        Home,

    },
    data (){
        return {
            loged : false,
        }
    },
    methods : {
        logedIn(){
            this.loged = true;
        }
    },
}
</script>