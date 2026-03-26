<template>
  <div class="nav-aside-container">
    <div class="nav-aside-operator" @click="handleIfShowNavAside">
      <el-button size="mini">
        <i
          :class="
            ifShowNavAside ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'
          "
        ></i>
      </el-button>
    </div>
    <div class="nav-items" v-if="ifShowNavAside">
      <div class="nav-title">Directly Start</div>

      <div
        class="nav-item-container"
        v-for="(item, index) in linkItems"
        :key="index"
      >
        <div class="nav-link-container" @click="handleLink(item.link)">
          {{ item.name }}
        </div>
        <div class="icon-container">
          <font-awesome-icon class="icon" :icon="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavAside",

  data() {
    return {
      ifShowNavAside: true,
      width: "300px",
      left: "270px",
      linkItems: [
        {
          name: "Tutorial",
          link: "tutorial",
          icon: ["fas", "life-ring"],
        },
        {
          name: "Analysis",
          link: "analysis",
          icon: ["fas", "chart-pie"],
        },
        {
          name: "Database",
          link: "overview",
          icon: ["fas", "database"],
        },
        {
          name: "Download",
          link: "download",
          icon: ["fas", "download"],
        },
      ],
    };
  },

  mounted() {},

  methods: {
    handleIfShowNavAside() {
      this.ifShowNavAside = !this.ifShowNavAside;
      this.width = this.ifShowNavAside ? "300px" : "30px";
      this.left = this.ifShowNavAside ? "270px" : "0";
    },

    handleLink(value) {
      this.$router.push({
        name: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-aside-container {
  position: relative;
  .nav-aside-operator {
    display: flex;
    justify-content: end;
    .el-button {
      border: none;
      background-color: #fff;
      color: #485b9a;
      font-size: 24px;
      border-radius: 0;
    }
  }
  .nav-items {
    width: 300px;
    .nav-title {
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 24px;
      font-weight: bold;
      color: #485b9a;
    }
    .nav-item-container {
      padding-left: 40px;
      padding-right: 40px;
      .nav-link-container {
        height: 40px;
        line-height: 40px;
        background-color: #485b9a;
        font-size: 18px;
        color: #fff;
        text-align: center;
        border-radius: 20px 20px 20px 20px;
        cursor: pointer;
      }
      .nav-link-container:hover {
        opacity: 0.5;
      }
      .icon-container {
        display: flex;
        justify-content: center;
        padding-top: 20px;
        padding-bottom: 10px;
        .icon {
          font-size: 80px;
          color: #ccc;
        }
      }
    }
  }
}
</style>