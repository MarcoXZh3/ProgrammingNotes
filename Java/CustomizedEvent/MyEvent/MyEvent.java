package MyEvent;

import java.util.EventObject;

/**
 * Customized event
 * @author  Marco
 * @version 1.0
 */
public class MyEvent extends EventObject {

    /** Default serial version UID */
    private static final long serialVersionUID = 1L;

    /**
     * Name of the event
     */
    private String eventName;

    /**
     * Constructor - create a customized event with a name
     * @param source    (<code>Object</code>) Source for the event
     * @param eventName (<code>String</code>) Name of the event
     */
    public MyEvent(Object source, String eventName) {
        super(source);
        this.eventName = eventName;
    } // public MyEvent(Object source, String eventName)

    /**
     * Get the name of the event
     * @return  (<code>String</code>) Name of the event
     */
    public String getEventName() {
        return eventName;
    } // public String getEventName()

} // public class MyEvent extends EventObject
