import Vue from 'vue';
import cnylogVue from './main.vue';

const cnylogConstructor = Vue.extend(cnylogVue);

let instance;
let instances = [];
let seed = 1;

const Message = function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  options.onClose = function() {
    // Message.close(id, userOnClose);
  };
  instance = new cnylogConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.show = true;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};
export default Message;