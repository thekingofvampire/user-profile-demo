<template>
  <div class="index-container">
    <div class="mt-11 menu-bread text-base xl:text-lg px-4 xl:px-0">
      <div class="xl:max-w-[1024px] mx-auto xl:bg-transparent text-[#999] hover:text-[#ff5000] cursor-pointer text-sm xl:text-base">
        user-profile-demo
      </div>
    </div>
    <div class="pt-11 flex items-center justify-center xl:justify-start xl:px-4 max-w-[1024px] mx-auto">
      <router-link class="cursor-pointer xl:flex xl:items-center" to="/user/profile">
        <img class="rounded-full w-[150px]" src="../../assets/images/default.png" alt="默认头像" />
        <span class="block mt-4 xl:ml-8">点击头像查看个人信息</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.index-container {
  height: 100%;
  background: #ececec;
}
</style>
