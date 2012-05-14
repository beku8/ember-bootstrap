var get = Ember.get;

Bootstrap.Button = Ember.Button.extend({
  classNames: ['btn'],
  classNameBindings: ['typeClass', 'sizeClass', 'disabled'],
  
  attributeBindings: ['type', 'disabled', 'href', 'rel'],
  
  typeClass: Ember.computed(function() {
    var type = get(this, 'type');
    return type ? 'btn-' + type : null;
  }).property('type').cacheable(),
  
  sizeClass: Ember.computed(function() {
    var size = get(this, 'size');
    return size ? 'btn-' + size : null;
  }).property('size').cacheable(),
    
  icon: null,
  iconViewClass: function() {
	var icon = this.get('icon');
	return Bootstrap.Icon.extend({ classNames:  icon});
  }.property('icon').cacheable()
});
