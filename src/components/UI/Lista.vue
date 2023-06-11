<template>
  <div id="Lista" ref="Lista">
    <div class="__lista">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lista",
  props: {},
};
</script>

<style lang="less">
.__lista {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em !important;
  width: 80%;
  margin: 0 auto !important;
  .__lista--item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .__lista--item--container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      border: 1px solid #0075fc;
      background-color: #fff;
      border-radius: 5px;
      margin: 0.6em;
      padding: 1em;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
      position: relative;
      i.__checked {
        position: absolute;
        right: -15px;
        top: -10px;
        color: #ffffff;
        background-color: #005f33;
        border-radius: 50%;
        font-size: 0.8em;
        margin-right: 0.5em;
        padding: 0.5em;
      }
      &.__resumeText {
        margin-top: 0px;
        border: 0px;
        box-shadow: none;
        h3 {
          font-size: 1em;
          font-weight: bold;
          color: #0075fc;
          font-weight: bold !important;
          margin-bottom: 1em;
          text-align: left;
          &:after {
            content: "";
            display: block;
            width: 20%;
            height: 2px;

            background-color: #0075fc;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
          }
        }
        p {
          display: block;
          text-align: left;
          font-size: 0.9em !important;
          font-weight: 500;
          color: #333333;
          margin-bottom: 1em;
        }
      }
      .__lista--item--check {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5%;
        font-weight: bold;
        color: #a70000;
        cursor:pointer;
        i {
        
          &.not_checked {
            
            opacity: 0.3 !important;
          }
          &.checked {
            opacity: 1 !important;
          }
        }
      }
      .__lista--item--site {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5%;
        font-weight: bold;
        color: #0075fc;
        input {
          color:#0075fc;
          border:0px;
          outline:0px;
          font-weight: bold !important;
          margin-left: 30px;
        }
      }
      .__lista--item--texto {
        width: 60%;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
      }
      .__lista--item--resume {
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        i {
          font-size: 1.5em !important;
          color: #0075fc;
          border: 2px solid transparent;
          border-radius: 50%;
          padding: 0.2em;
          transition: all 0.3s ease-in-out;
          &:hover {
            color: #ffffff;
            border: 2px solid #0075fc;
            border-radius: 50%;
            background-color: #0075fc;
          }
        }
      }
      .__lista--item--link {
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 1.5em !important;
          color: #0075fc;
          border: 2px solid transparent;
          border-radius: 50%;
          padding: 0.2em;
          transition: all 0.3s ease-in-out;
          &:hover {
            color: #ffffff;
            border: 2px solid #0075fc;
            border-radius: 50%;
            background-color: #0075fc;
          }
        }
      }
      .__lista--item--save {
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor:pointer;
        i {
          font-size: 1.5em !important;
          color: #0075fc;
          border: 2px solid transparent;
          border-radius: 50%;
          padding: 0.2em;
          transition: all 0.3s ease-in-out;
          &:hover {
            color: #ffffff;
            border: 2px solid #0075fc;
            border-radius: 50%;
            background-color: #0075fc;
          }
        }
      }
    }
  }
}
</style>