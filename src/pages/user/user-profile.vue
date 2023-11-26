<template>
  <div class="user-profile-container">
    <!-- 用户背景 -->
    <div
      class="avatar-bg h-[300px] flex items-center justify-center"
      :style="`background-image: url(${avatarBg ? avatarBg : '/src/assets/images/defaultbg.png'})`"
    >
      <div class="relative">
        <!-- 默认头像 -->
        <img
          class="w-[150px] rounded-full"
          :src="avatar ? avatar : '/src/assets/images/default.png'"
          alt=""
        />
        <!-- 编辑icon -->
        <img
          class="absolute bottom-0 right-0 w-8 h-8 cursor-pointer"
          @click="changeEditMode"
          :src="!isEditMode ? '/src/assets/images/edit.png' : '/src/assets/images/quitedit.png'"
          alt=""
        />
      </div>
    </div>
    <div class="px-4 xl:px-0 max-w-[1024px] mx-auto">
      <!-- title -->
      <div class="py-10 text-sm xl:text-base font-bold xl:text-center">用户信息</div>
      <div class="user-info">
        <a-form
          ref="userForm"
          class="pb-8"
          :model="userInfo"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <!-- 昵称 -->
          <a-form-item
            ref="name"
            label="昵称"
            name="name"
          >
            <a-input
              v-if="isEditMode"
              v-model:value="userInfo.name"
            />
            <div
              v-else
              class="info-detail px-1"
            >{{ userInfo.name }}</div>
          </a-form-item>
          <!-- 性别 -->
          <a-form-item
            label="性别"
            name="sex"
          >
            <a-select
              v-if="isEditMode"
              v-model:value="userInfo.sex"
              placeholder="请选择您的性别"
            >
              <a-select-option value="male">男</a-select-option>
              <a-select-option value="female">女</a-select-option>
            </a-select>
            <div
              v-else
              class="info-detail px-1"
            >{{ userInfo.sex == 'male' ? '男' : '女' }}</div>
          </a-form-item>
          <!-- 出生日期 -->
          <a-form-item
            label="出生日期"
            required
            name="birth"
          >
            <a-date-picker
              v-if="isEditMode"
              v-model:value="userInfo.birth"
              type="date"
              placeholder="选择出生日期"
              style="width: 100%"
              :locale="locale"
            />
            <div
              v-else
              class="info-detail px-1"
            >{{ dayjs(userInfo.birth).format("YYYY-MM-DD") }}</div>
          </a-form-item>
          <!-- 手机号 -->
          <a-form-item
            ref="mobile"
            label="手机号"
            name="mobile"
          >
            <a-input
              v-if="isEditMode"
              v-model:value="userInfo.mobile"
            />
            <div
              v-else
              class="info-detail px-1"
            >{{ userInfo.mobile }}</div>
          </a-form-item>
          <!-- 邮箱 -->
          <a-form-item
            label="邮箱"
            required
            name="emailBefore"
          >
            <a-input
              v-if="isEditMode"
              placeholder="请输入您的邮箱"
              v-model:value="userInfo.emailBefore"
            >
              <template #addonAfter>
                <a-select
                  v-model:value="userInfo.emailAfter"
                  style="width: 160px"
                >
                  <a-select-option value="@qq.com">@qq.com</a-select-option>
                  <a-select-option value="@google.com">@google.com</a-select-option>
                  <a-select-option value="@outlook.com">@outlook.com</a-select-option>
                </a-select>
              </template>

            </a-input>
            <div
              v-else
              class="info-detail px-1"
            >{{ userInfo.email }}</div>
          </a-form-item>
          <!-- 个人简介 -->
          <a-form-item
            label="个人简介"
            name="desc"
          >
            <a-textarea
              v-if="isEditMode"
              v-model:value="userInfo.desc"
            />
            <div
              v-else
              class="info-detail px-1"
            >{{ userInfo.desc }}</div>
          </a-form-item>
        </a-form>
        <div
          class="button-wrap pb-20 flex items-center justify-center"
          v-if="isEditMode"
        >
          <a-button
            type="primary"
            @click="submitInfo"
          >提交</a-button>
          <a-button
            class="ml-4"
            @click="resetUserInfo"
          >取消</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

import { reactive, ref, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';

import type { Rule } from 'ant-design-vue/es/form';
import storage from '../../assets/js/localStorage';

const avatarBg = ref(storage.getStorage('avatarbg'));
const avatar = ref(storage.getStorage('avatar'));


interface FormState {
  name: string;
  sex: string | undefined;
  birth: Dayjs | undefined | string;
  email: string;
  mobile: number | undefined;
  desc: string;
  emailBefore: string;
  emailAfter: string;
}
// 表单元素
const userForm = ref();
const labelCol = { span: 6 };
const wrapperCol = { span: 12 };
let userInfoFormStorage = storage.getStorage('userInfoForm');
if (userInfoFormStorage) {
  userInfoFormStorage.birth = dayjs(userInfoFormStorage.birth);
}
const userInfo: UnwrapRef<FormState> = reactive(userInfoFormStorage ? { ...userInfoFormStorage } : {
  name: '我是昵称',
  sex: 'male',
  birth: dayjs('1999-10-28'),
  emailBefore: '999888111',
  emailAfter: '@qq.com',
  email: '',
  mobile: 18899887766,
  desc: '我是一只小小小鸟',
});
userInfo.email = userInfo.emailBefore + userInfo.emailAfter;


// 判断是否提交
const isCommit = ref<boolean>(false);

// 控制编辑
const isEditMode = ref<boolean>(false);
const changeEditMode = (): void => {
  if (isEditMode.value) return;
  isEditMode.value = !isEditMode.value;
};
// 

window.onbeforeunload = function () {
  if(isEditMode.value) {
    return "您有未保存的信息，确定离开当前页面吗？";
  }
};

// 表单规则
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: '请输入您的昵称', trigger: 'change' },
    { min: 3, max: 10, message: '昵称不能超过10个字哦', trigger: 'blur' },
  ],
  sex: [{ required: true, message: '请选择您的性别', trigger: 'change' }],
  birth: [{ required: true, message: '请选择您的生日', trigger: 'change' }],
  email: [
    { required: true, message: '请输入您的邮箱', trigger: 'change' },
    { pattern: /\w+([-+.]\w+)*/, message: '请输入正确的邮箱', trigger: 'change' },
  ],
  mobile: [
    { required: true, message: '请输入正确的手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
};
const submitInfo = () => {
  userForm.value
    .validate()
    .then(() => {
      const userInfoStorageData = { ...toRaw(userInfo) };
      userInfoStorageData.birth = dayjs(userInfoStorageData.birth).format("YYYY-MM-DD");
      userInfoStorageData.email = userInfoStorageData.emailBefore + userInfoStorageData.emailAfter;
      storage.setStorage('userInfoForm', userInfoStorageData);
      isEditMode.value = false;
    })
    .catch(error => {
      console.log('error', error);
    });
};
const resetUserInfo = (): void => {
  userForm.value.resetFields();
};
</script>

<style lang="scss">
.user-profile-container {
  // min-height: 100%;

  .avatar-bg {
    // background-image: url(../../assets//images/defaultbg.png);
    // @apply text-xs;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .info-detail {
    padding-left: 8px;
    border-left: 2px solid #ccc;
  }
}</style>
