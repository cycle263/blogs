// create by cycle263
(function(global, factory){
  if(typeof define === 'function' && define.amd){   // AMD
    define(function(){ return factory(global); });
  }else if(typeof exports === 'object' && typeof module === 'object'){  // commonJS
    module.exports = factory(global);
  }else if(typeof export === 'object'){
    export["PubSub"] = factory(global);
  }else{
    global["PubSub"] = factory(global);
  }
})(this, function(global){
  'use strict';

  var tickets = {},
    initUid = -1,
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
    var token = 'uid_' + Date.now().toString().substr(11) + Math.random().toString().substr(2, 2) + (++initUid);
    tickets[ticket][token] = func;
    return token;
  };

  // puslish subscription
  PubSub.publish = function(ticket, data){
    var result = false;
    if(!ticket || typeof ticket !== 'string'){
      console.warn('Subscription does not exist');
      return result;
    }

    var position = ticket.lastIndexOf('.'), key,
      subscribers = tickets[ticket];
    if(!subscribers || typeof subscribers !== 'object'){
      console.warn('The function of subscription does not exist');
    } else {
      for(key in subscribers){
        if(subscribers.hasOwnProperty(key) && typeof subscribers[key] === 'function'){
          subscribers[key](ticket, data);
          result = true;
        }
      }
    }
    while(position !== -1){
			ticket = ticket.substr(0, position);
			position = ticket.lastIndexOf('.');
      var subscriber = tickets[ticket];
      for(key in subscriber){
        if(subscriber.hasOwnProperty(key) && typeof subscriber[key] === 'function'){
          subscriber[key](ticket, data);
          result = true;
        }
      }
		}
    return result;
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
