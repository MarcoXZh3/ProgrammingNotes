package MyEvent;

import MyEvent.MyEvent;
import MyEvent.MyEventListener;
import MyEvent.MyEventSource;

/**
 * Driver for testing customized event
 * @author  Marco
 * @version 1.0
 */
public class MyEventDriver {
    /**
     * Program main entry
     * @param args  (<code>String[]</code>) Command line arguments
     */
    public static void main(String[] args) {
        final MyEventSource s1 = new MyEventSource("s1");
        final MyEventSource s2 = new MyEventSource("s2");

        s1.addMyEventListener(new MyEventListener() {
            @Override
            public void handleEvent(MyEvent e) {
                System.out.println("Source: " + ((MyEventSource)e.getSource()).getSourceName() +
                                   "; Event: " + e.getEventName() + "; Event number: 1");
            } // public void handleEvent(MyEvent e)
        }); // s1.addMyEventListener(new MyEventListener());

        s1.addMyEventListener(new MyEventListener() {
            @Override
            public void handleEvent(MyEvent e) {
                System.out.println("Source: " + ((MyEventSource)e.getSource()).getSourceName() +
                                   "; Event: " + e.getEventName() + "; Event number: 2");
            } // public void handleEvent(MyEvent e)
        }); // s1.addMyEventListener(new MyEventListener());

        s2.addMyEventListener(new MyEventListener() {
            @Override
            public void handleEvent(MyEvent e) {
                System.out.println("Source: " + ((MyEventSource)e.getSource()).getSourceName() +
                                   "; Event: " + e.getEventName());
            } // public void handleEvent(MyEvent e)
        }); // s1.addMyEventListener(new MyEventListener());

        s1.fireMyEvent("e1");
        s2.fireMyEvent("e2");
    } // public static void main(String[] args)
} // public class MyEventDriver
