<template>
    <div >
        <h1>Login</h1>
        <div>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
        </div>
        <div>
            <button class="button button--disabled">Login</button>
        </div>
        <div>
        <p>Do not have an account yet ?</p>
        <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
        </div>
    </div>
</template>