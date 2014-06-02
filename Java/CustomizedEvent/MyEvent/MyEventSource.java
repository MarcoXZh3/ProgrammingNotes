package MyEvent;

import javax.swing.event.EventListenerList;

/**
 * Source listening the customized event
 * @author  Marco
 * @version 1.0
 */
public class MyEventSource {
    private String sourceName;
    private MyEvent myEvent = null;
    private EventListenerList listenerList = new EventListenerList();
    /**
     * Constructor - create an event source with name
     * @param sourceName    (<code>String</code>) Name of the source
     */
    public MyEventSource(String sourceName) {
        this.sourceName = sourceName;
    } // public MyEventSource(String sourceName)
    /**
     * Get the name of the source
     * @return  (<code>String</code>) Name of the event source
     */
    public String getSourceName() {
        return sourceName;
    } // public String getSourceName()
    /**
     * Add a listener of the customized event
     * @param listener  (<code>MyEventListener</code>) Listener of the event
     */
    public void addMyEventListener(MyEventListener listener) {
        listenerList.add(MyEventListener.class, listener);
    } // public void addMyEventListener(MyEventListener listener)
    /**
     * Remove the listener of the customized event
     * @param listener  (<code>MyEventListener</code>) Listener of the event
     */
    public void removeMyEventListener(MyEventListener listener) {
        listenerList.remove(MyEventListener.class, listener);
    } // public void removeMyEventListener(MyEventListener listener)
    /**
     * Fire a customized event with event name
     * @param eventName (<code>String</code>) Name of the event
     */
    public void fireMyEvent(String eventName) {
        // Guaranteed to return a non-null array
        Object[] listeners = listenerList.getListenerList();
        // Process the listeners last to first, notifying
        // those that are interested in this event
        for (int i = listeners.length - 2; i >= 0; i -= 2)
            if (listeners[i] == MyEventListener.class) {
                // Lazily create the event:
                if (myEvent == null)
                    myEvent = new MyEvent(this, eventName);
                ((MyEventListener)listeners[i + 1]).handleEvent(myEvent);
            } // for - if
    } // public void processEvent(MyEvent event)

} // public class MyEventSource
