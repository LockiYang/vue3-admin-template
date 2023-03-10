<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import SizeSelect from "@/components/SizeSelect/index.vue";
import LangSelect from "@/components/LangSelect/index.vue";
import { CaretBottom, Avatar } from "@element-plus/icons-vue";

import { useAppStore, DeviceType } from "@/stores/modules/app";
import { useTagsViewStore } from "@/stores/modules/tagsView";
import { useUserStore } from "@/stores/modules/user";

const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const device = computed(() => appStore.device);

function toggleSideBar() {
  appStore.toggleSidebar(true);
}

function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>

<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <template v-if="device !== DeviceType.mobile">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
        <lang-select class="right-menu-item hover-effect" />
      </template> -->

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <img :src="userStore.avatar + '?imageView2/1/w/80/h/80'" /> -->
          <Avatar style="width: 1em; height: 1em; margin-left: 5px" />
          <CaretBottom style="width: 1em; height: 1em; margin-left: 5px" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t("navbar.dashboard") }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/hxrui">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://gitee.com/haoxr">
              <el-dropdown-item>{{ $t("navbar.gitee") }}</el-dropdown-item>
            </a>
            <a target="_blank" href="https://www.cnblogs.com/haoxianrui/">
              <el-dropdown-item>{{ $t("navbar.document") }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              {{ $t("navbar.logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: #ebeef5 solid 1px;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        // position: relative;
        line-height: 50px;

        img {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
