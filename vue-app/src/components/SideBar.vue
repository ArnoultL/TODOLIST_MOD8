<template> 
  <aside class="sidebar"> 
    <header class="sidebarbloc">
      <h2 class="sidebar-title">Menu</h2>
      <p>THIS IS A HEADER></p>
    </header>
    <body>
        <h2>THIS IS BODY</h2>
        <table>
            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>frhjfhbdsjhf</td>
                    <td>Gift Bag</td>
                    <td>$99.00</td>
                    <td>dfdsfndfbfd</td>
                    <td>$99.00</td>
                </tr>
            </tbody>
        </table>
    </body>
  </aside> 
</template>

<script>
export default {
    props:['toggle']
}
</script>


<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color:rgb(218, 255, 220);
  border-right: 1px solid #ddd;
  padding: 1rem;
}

.sidebarbloc {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-title {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}
</style>
