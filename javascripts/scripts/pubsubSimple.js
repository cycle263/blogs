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

  /**
   *  return subscription token
	 *  @param { func } subscription function
	 *	@param { ticket } subscription type
	 */
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

  // puslish subscription
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

  // cancel single subscription
  PubSub.unSubscribe = function(ticket, token){
    return PubSub.cancelSubscribe(ticket, token);
  };

  // cancel single subscription
  PubSub.cancelSubscribe = function(ticket, token){
    if(!ticket || typeof ticket !== 'string'){
      console.warn('Subscription does not exist');
      return;
    }
    if(!token || typeof token !== 'string' || token.indexOf('uid_') !== 0){
      console.log('Token does not exist');
      PubSub.clearSubscribe(ticket);
    }
    if(ticket in tickets && tickets.hasOwnProperty(ticket) && token in tickets[ticket] && tickets[ticket].hasOwnProperty(token)){
      delete tickets[ticket][token];
      return true;
    }
    return false;
  };

  // clear single subscription
  PubSub.clearSubscribe = function(ticket){
    if(!ticket || typeof ticket !== 'string'){
      console.warn('Subscription does not exist');
      return;
    }
    if(ticket in tickets && tickets.hasOwnProperty(ticket)){
      delete tickets[ticket];
      return true;
    }
    return false;
  };

  // clear all subscriptions
  PubSub.clearAllSubscribe = function(){
    tickets = {};
    return true;
  };

  return PubSub;
});
