# jQuery Notify

**jQuery Notify** is a jQuery plugin that easily displays html notifications.

Please visit [www.vicreative.nl](http://www.vicreative.nl/Projects/Notify) for full documentation.

## Install

```
npm install jquery-notifier
```

## Usage
```
import "jquery-notifier";
```

scss

```
import "jquery-notifier/src/notify.scss";
```

css

```
import "jquery-notifier/lib/notify.css";
```

The notify plugin makes displaying notifications easy.  
Every notification will be visible for a configurable time, but can also be made sticky.  
Every notification container element has its own queue of notification messages. The position of the notification messages are automatically updated when a notification message is added or removed.  
The notification can also contain HTML.  
By default, the notify plugin contains 4 types:

*   **info**, the default notification, visible for 3 seconds.
*   **success**, a sticky notifcation for success messages.
*   **error**, a sticky notification for error messages.
*   **warning**, a sticky notification for warnings.

The configuration of these types can be customized and custom types can be added. The rendering of these types is customizable.  
By default. there are 2 styles:

*   **bar**, a full width bar
*   **box**, a box positioned on the right of the window

Custom styles can be added.

### Helpers

#### $.notify.create

The $.notify.create function creates and returns a text based notification. This function has two arguments, the text for the notification and the notifcation options. The last argument is optional.

var notification = $.notify.create("some notification text", { /\* configuration options \*/ });

### Type Configuration

All types can be configured and all have a default configuration set.  
The default configuration set can also be changed. The **$.notify.settings** object holds the configuration for all types.  
The name of the type is the key of the object. When no type is set, the settings for the type info ($.notify.settings.info or $.notify.settings\["info"\]) are used. Custom types can be added as well. Simply add a new key to **$.notify.settings** and create a notification with the type set to this key.  
All options defined below can be set in the settings object. The settings object of the provided type will extend the settings object of type info.

```javascript
$.notify.settings["info"].sticky = true;
```


In this example, the sticky property of notifications of type info is set to true. All notifications of type info will now be sticky.

### Options

#### adjustContent

Sets whether the content in the container should be adjusted to make room for the notification.  
Note: When adjustScroll is set to true, this property is ignored.

**datatype**: Boolean

**default**: false

```javascript
$(".notification").notify({ adjustContent : false });
```


#### adjustScroll 

Sets whether the notification should adjust to scrolling and bind to the scroll event.  
Note: When set to true, the adjustContent property is ignored.

**datatype**: Boolean

**default**: false

```javascript
$(".notification").notify({ adjustScroll: true });
```

#### animationDuration 

Sets the duration of the hide and show animation in miliseconds.

**datatype**: Integer

**default**: 500

```javascript
$(".notification").notify({ animationDuration : 500 });
```

#### appendTo 

Sets the selector for the container element of the notifications. All notifications will be appended to this container element and added to its queue of notification messages.

**datatype**: String

**default**: "body"

```javascript
$(".notification").notify({ appendTo : ".menu > .notifications" });
```


#### autoShow 

Sets whether the notification should be immediately shown after initialization.

**datatype**: Boolean

**default**: true

```javascript
$(".notification").notify({ autoShow : true });
```


#### closeText 

Sets the text of the close icon.

**datatype**: String

**default**: "X"

```javascript
$(".notification").notify({ closeText : "X" });
```


#### displayTime 

Sets the visibility time of the notification in miliseconds.

**datatype**: Integer

**default**: 3000

```javascript
$(".notification").notify({ displayTime : 3000 });
```


#### notifyClass 

Adds a custom class to the notification element.

**datatype**: String

**default**: ""

```javascript
$(".notification").notify({ notifyClass: "myCustomClass" });
```


#### opacity 

Sets the opacity of the notification message.

**datatype**: Double

**default**: 1

```javascript
$(".notification").notify({ opacity: 0.8 });
```


#### sticky 

Sets whether the notification is sticky and can only be removed by clicking on the close icon.

**datatype**: Boolean

**default**: false, for type success and error the default value is true

```javascript
$(".notification").notify({ sticky : false });
```


#### style 

Sets the rendering style of the notification message.

**datatype**: String

**default**: 'bar'

**possible values**: 'bar', 'box'. Custom styles can be added.

```javascript
$(".notification").notify({ style: 'box' });
```


#### type 

Sets the type of the notification message. This will change the rendering and sets the default options to the options of the corresponding type.

**datatype**: String

**default**: 'info'

**possible values**: 'info', 'success', 'error', 'warning'. Custom types can be added.

```javascript
$(".notification").notify({ type: 'success' });
```


### Events

#### beforeShow

The beforeShow event is raised before the show animation of the notification has started.

arguments:

*   beforeShow event
*   notify object: "element" property containing element to notify and "settings" property containing the settings for this notify object.

```javascript
$(".notification").notify({ 
    beforeShow : function(event, notify) {
        var notifier = $(this); // reference to notification element 
    }
});
```


#### afterShow

The afterShow event is raised after the show animation of the notification has completed.

arguments:

*   afterShow event
*   notify object: "element" property containing element to notify and "settings" property containing the settings for this notify object.

```javascript
$(".notification").notify({ 
    afterShow : function(event, notify) {
        var notifier = $(this); // reference to notification element 
    }
});
```


#### beforeHide

The beforeHide event is raised before the hide animation of the notification has started.

arguments:

*   beforeHide event
*   notify object: "element" property containing element to notify and "settings" property containing the settings for this notify object.

```javascript
$(".notification").notify({ 
    beforeHide : function(event, notify) {
        var notifier = $(this); // reference to notification element 
    }
});
```


#### afterHide

The afterHide event is raised after the hide animation of the notification has completed.

arguments:

*   afterHide event
*   notify object: "element" property containing element to notify and "settings" property containing the settings for this notify object.

```javascript
$(".notification").notify({ 
    afterHide : function(event, notify) {
        var notifier = $(this); // reference to notification element 
    }
});
```

### Methods

#### show

Shows the notification.

```javascript
$(".notification").notify("show");
```


#### hide

Hides the notification.

```javascript
$(".notification").notify("hide");
```


#### destroy

Destroys the notification element and unbinds all events.

```javascript
$(".notification").notify("destroy");
```


### Requirements

*   jQuery 1.8.3+ (could also work on previous versions, but is not tested)