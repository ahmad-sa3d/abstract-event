
/**
 * 	My Event System
 *
 * @package 	MyEvent Custom Event System
 * @name  		MyEvent
 * @author  	Ahmed Saad < a7mad.sa3d.2014@gmail.com >
 * @version 	1.1 	June, 10 2017
 * @license  	<https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode> CC BY-NC-SA 	Licence
 * 
 * @changes 	[1.1] Add check on fire event if there are handlers or not, check for module export
 */

 var MyEvent = function(){

 	Object.defineProperty( this, 'eventHandlers', {

 		value: {},
 		configurable: true,
 		enumerable: true,
 		writable: true,

 	} );

 };

 Object.defineProperties( MyEvent.prototype, {

	/**
	 * Alias For addEventsHandlers
	 */
	extractEventsHandlers: {
		value: function( object )
		{
			this.addEventsHandlers( object );
		},
		enumerable: false,
	},

 	/**
	 * Fire Custom Events, and returns handler returned value
	 *
	 * @param {String} eventName Custom Event name
	 * @param {string | Array} Args argument(s) if exists
	 *
	 * @return Bool | any
	 */
	fire: {
		value: function( eventName, Args )
		{
			// console.log( 'hey event', this, this.eventHandlers )
			if( this.eventHandlers && typeof this.eventHandlers[ eventName ] != 'undefined' )
			{
				
				if( Args && !(Args instanceof Array) )
					Args = [ Args ];

				this.eventHandlers[ eventName ].forEach( function( handler ){

					if( typeof handler == 'function' )
						handler.apply( this, Args );

				}.bind( this ) );

			}

			// No Listeners
			// return null;
		},
		enumerable: false,
	},


	/**
	 * Add Group of Events Handlers
	 *
	 * @param {Object} Handlers Object, key value
	 */
	addEventsHandlers: {
		value: function( handlers )
		{
			if( typeof handlers !== 'object' )
				return;

			for( p in handlers )
				this.addEventHandler( p, handlers[ p ] );

		},
		enumerable: false,
	},

	/**
	 * Remove All Events Handlers
	 *
	 * @param {Object} Handlers Object, key value
	 */
	removeEventsHandlers: {
		value: function()
		{
			for( p in this.eventHandlers )
				delete this.eventHandlers[ p ];
		},
		enumerable: false,
	},

	/**
	 * Remove Event Handlers
	 *
	 * @param {Object} Handlers Object, key value
	 */
	removeEventHandlers: {
		value: function( eventName )
		{
			if( typeof this.eventHandlers[ eventName ] != 'undefined' )
				delete this.eventHandlers[ eventName ];

		},
		enumerable: false,
	},

	/**
	 * Add Single Event Handler
	 *
	 * @param {String} eventName Custom Event name
	 * @param {Function} handler
	 */
	addEventHandler: {
		value: function( eventName, handler )
		{
			if( typeof handler != 'function' )
				return;

			if( typeof this.eventHandlers[ eventName ] == 'undefined' )
					this.eventHandlers[ eventName ] = [];
			else
			{
				if( this.eventHandlers[ eventName ].indexOf( handler ) !== -1 )
				{
					console.warn( 'duplicate handler' );
					return;
				}
			}

			this.eventHandlers[ eventName ].push( handler );

		},
		enumerable: false,
	},

 } );

if( typeof module != 'undefined' )
	module.exports = MyEvent;