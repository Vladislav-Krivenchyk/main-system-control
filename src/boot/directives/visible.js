import Vue from 'vue';

export default Vue.directive('visible', function(el, binding) {
    el.style.visibility = binding.value ? 'visible' : 'hidden';
});