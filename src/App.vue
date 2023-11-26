<template>
  <div class="app flex flex-col">
    <div class="bg-[#ff5000] w-full px-4 h-14 text-xl/[56px] text-center text-white">这是header</div>
    <div class='flex-1 overflow-y-auto'>
      <RouterView class=""></RouterView>
      <div class="bg-[#ff5000] w-full px-4 h-24 text-xl/[96px] text-center text-white">这是footer</div>
    </div>
  </div>
</template>

<style>
.app {
  height: 100%;
}
</style>
