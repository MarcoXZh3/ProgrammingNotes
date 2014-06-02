package MyEvent;

import java.util.EventListener;

/**
 * Listener of the customized event
 * @author  Marco
 * @version 1.0
 */
public interface MyEventListener extends EventListener {

    /**
     * Handle the customized event
     * @param event (<code>MyEvent</code>) Event to handle
     */
    public void handleEvent(MyEvent event);

} // public interface MyEventListener extends EventListener
