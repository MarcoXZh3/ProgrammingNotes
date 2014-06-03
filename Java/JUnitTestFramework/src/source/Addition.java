package source;


/**
 * Addition implementation for testing
 * @author  Marco
 * @version 1.0.0.0
 */
public class Addition {

    /**
     * Margin of error
     */
    public final double EPSILON = 1E-10;

    /**
     * Adding two numbers
     * @param d1    (<code>double</code>) first number
     * @param d2    (<code>double</code>) second number
     * @return      (<code>double</code>) summation
     */
    public double add(double d1, double d2) {
        return d1 + d2;
    } // public double add(double d1, double d2)

    /**
     * Adding two array of numbers
     * @param d1    (<code>double[]</code>) first array of numbers
     * @param d2    (<code>double[]</code>) second array of numbers
     * @return      (<code>double[]</code>) array of summations
     */
    public double[] add(double[] d1, double[] d2) {
        if (d1.length != d2.length)
            return null;
        double[] result = new double[d1.length];
        for (int i = 0; i < d1.length; i++)
            result[i] = d1[i] + d2[i];
        return result;
    } // public double[] add(double[] d1, double[] d2)

} // public class Addition
