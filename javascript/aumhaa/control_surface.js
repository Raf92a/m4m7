autowatch = 1;

inlets = 1;
outlets = 1;

var finder;
var M4LCOMPONENT=new RegExp(/(M4LInterface)/);
var control_surface_type = jsarguments[1]||'None';

var script = this;

aumhaa = require('_base');
var FORCELOAD = true;
var DEBUG = true;
aumhaa.init(this);

function init()
{
	debug('control_surface_finder init');
	finder = new LiveAPI(callback, 'control_surfaces');
	var number_children = parseInt(finder.children[0]);
	debug('control_surfaces length:', number_children);
	for(var i=0;i<number_children;i++)
	{
		debug('Checking control surface #:', i);
		finder.goto('control_surfaces', i);
		debug('type is:', finder.type);
		if(finder.type == control_surface_type)
		{
			var components = finder.get('components');
			for (var i in components)
			{
				debug('component is:', finder.type);
				finder.id = components[i];
				if(M4LCOMPONENT.test(finder.type)>0)
				{
					control_surface_id = finder.id;
					break;
				}
			}
			if(control_surface_id)
			{
				outlet(0, 'path', finder.path);
				deprivatize_script_functions(script);
			}
		}
	}
}

function _call_function()
{
	var args = arrayfromargs(arguments);
	func = args[0] ? args[0] : undefined;
	debug('call_function:', func, 'args:', args);
	try
	{
		this.finder.call.apply(this.finder, args);
	}
	catch(err)
	{
		this.debug('_call_function error:', err, args);
	}
}

function callback(args){}

forceload(this);