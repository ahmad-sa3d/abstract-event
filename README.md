## Abstract Event


abstract event is simple event system to add custom event feature for your custom data type

### Version: __1.1.0__


### Install
	npm install abstract-event --save
	
### Usage

> Require
	
	var MyEvent = require('abstract-event');
	
> Integrate with data type

	let MyClass = function(){
		
		// inherit my event instance
		MyEvent.call( this );
	}
	
	// 2- inherit prototype Methods
	
	MyClass.prototype = Object.create( MyEvent.prototype, {} );
	
	
> subscribe events and fire events

	var obj = new MyClass();
	
	// subscribe, add events handlers
	obj.addEventsHandlers({
		'eventName': function( arg1, arg2 ){
			console.log( arg1, arg2 );
		},
		
		'anotherEvent': function( arg ){
			// console.log( 'another Event Fired', arg );
		}
	});
	
	// add single event handler
	obj.addEventHandler( 'eventName', function(){
			console.log( 'another handler for eventName' );
		});
	
	// Fire Event
	obj.fire( 'eventName', [ arg1, arg2 ] );
	obj.fire( 'anotherEvent', arg );
	
	// remove event handlers
	obj.removeEventHandlers( 'eventName' );
	
	// clear all events handlers
	obj.removeEventsHandlers();
	
	
### Methods:

* addEventsHandlers( handlers )
* extractEventsHandlers( handlers )
* addEventHandler( event, handler )
* removeEventsHandlers()
* removeEventHandlers( event )
* fire( event, argsArray|arg )