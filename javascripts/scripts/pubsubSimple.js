// create by cycle263
(function(global, factory){
  if(typeof define === 'function' && define.amd){
    define(function(){ return factory(global); });
  }else if(typeof exports === 'object'){
    module.exports = factory;
  }else {
    global.PubSub = factory(global);
  }
})(this, function(global){
  'use strict';

  var tickets = {},
    PubSub = {},
    hasKeys = function(obj){
  		var key;
  		for (key in obj){
  			if ( obj.hasOwnProperty(key) ){
  				return true;
  			}
  		}
  		return false;
  	};

  PubSub.subscribe = function(ticket, func){
    if(typeof func !== 'function'){
      return false;
    }
    if(!tickets.hasOwnProperty(ticket)){
      tickets[ticket] = {};
    }
    var token = 'uid_' + Date.now().toString() + Math.random().toString().substr(2, 8);
    tickets[ticket][token] = func;
    return token;
  };

  PubSub.publish = function(ticket, data){
    if(!ticket || typeof ticket !== 'string'){
      console.warn('Subscription does not exist');
      return;
    }

    var position = ticket.lastIndexOf('.'), key,
      subscribers = tickets[ticket];
    if(!subscribers || typeof subscribers !== 'object'){
      console.warn('The function of subscription does not exist');
      return;
    }
    for(key in subscribers){
      if(subscribers.hasOwnProperty(key) && typeof subscribers[key] === 'function'){
        subscribers[key](ticket, data);
      }
    }
    while(position !== -1){
			ticket = ticket.substr(0, position);
			position = ticket.lastIndexOf('.');
      var subscriber = tickets[ticket];
      for(key in subscriber){
        if(subscriber.hasOwnProperty(key) && typeof subscriber[key] === 'function'){
          subscriber[key](ticket, data);
        }
      }
		}
  };

  PubSub.unSubscribe = function(ticket){
    return PubSub.clearSubscribe(ticket);
  };

  PubSub.clearSubscribe = function(ticket){
    if(!ticket || typeof ticket !== 'string'){
      console.warn('Subscription does not exist');
      return;
    }
    if(ticket in tickets){
      delete tickets[ticket];
      return true;
    }
    return false;
  };

  PubSub.clearAllSubscribe = function(){
    tickets = {};
    return true;
  };

  return PubSub;
});
