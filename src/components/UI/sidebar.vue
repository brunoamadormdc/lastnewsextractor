<template>
  <aside id="sidebar" ref="sidebar">
    <div class="__content">
      <nav class="__content--menu">
        <ul>
          <li @click="$router.push('/main/links')">
            <span>
                <i class="fa-solid fa-link"></i>
            </span>
            Links</li>
          <li @click="$router.push('/main/linkshistory')">
            <span>
                <i class="fa-solid fa-file-pen"></i>
            </span>
            Links Salvos</li>
           
          <li @click="$router.push('/main/profile')">
            <span>
                <i class="fa-solid fa-user"></i>
            </span>
            Perfil</li>
          <li @click="$router.push('/main/profile')">
            <span>
              <i class="fa-solid fa-right-from-bracket"></i>
            </span>
            Logout
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#sidebar {
  width: 12em;
  height: 100%;
  background-color: #0075fc;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .__content {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    .__content--menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
          display: flex;
          justify-content: flex-start;
          width: 100%;
          padding: 0.6em 1em;
          padding-left: 1.5em;
          color: #c8f7ff;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          border-radius: 5px;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          &:hover {
            transition: all 0.3s ease-in-out;
            background-color: #fff;
            color: #0075fc;
            border-radius: 5px;
          }
          span {
            color: inherit;
            margin-right: 1em;
          }
        }
      }
    }
  }
}
</style>