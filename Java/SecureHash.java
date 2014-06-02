import java.io.File;
import java.io.FileInputStream;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.util.zip.CRC32;
import java.util.zip.CheckedInputStream;

/**
 * Secure Hash Utility - Calculate MD5, SHA1 and CRC32
 * @author  Marco
 * @version 1.0.0.0
 */
public final class SecureHash {

    /**
     * Hexadecimal digits
     */
    private static final char[] HEXs = {'0', '1', '2', '3', '4', '5', '6', '7',
                                        '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

    /**
     * Convert a byte array to a hexadecimal digit string
     * @param bytes (<code>byte[]</code>) Byte array to be converted
     * @return      (<code>String</code>) Hexadecimal digit string
     */
    private static String bufferToHex(byte[] bytes) {
        StringBuilder buf = new StringBuilder(bytes.length * 2);
        for (int i = 0; i < bytes.length; i++)
            buf.append(HEXs[(bytes[i] >> 4) & 0x0F]).append(HEXs[bytes[i] & 0x0F]);
        return buf.toString();
    } // private static String bufferToHex(byte[] bytes)

    /**
     * Calculate secure hash value of a string
     * @param str       (<code>String</code>) The string to be hashed
     * @param algorithm (<code>String</code>) The secure hash algorithm
     * @return          (<code>String</code>) Secure hash value or error message
     */
    public static String hash(String str, String algorithm) {
        try {
            if (algorithm.trim().equals("MD5") || algorithm.trim().equals("SHA1")) {
                MessageDigest md = MessageDigest.getInstance(algorithm);
                md.update(str.getBytes());
                return bufferToHex(md.digest());
            } else if (algorithm.trim().equals("CRC32")) {
                CRC32 crc = new CRC32();
                crc.update(str.getBytes());
                return Long.toHexString(crc.getValue()).toUpperCase();
            } else
                return "N/A: Unsupported secure hash algorithm";
        } catch (Exception e) {
            return "N/A: " + e.getMessage();
        } // try - catch (Exception e)
    } // public static String hash(String str, String algorithm)

    /**
     * Calculate secure hash value of a string
     * @param str   (<code>String</code>) The string to be hashed
     * @return      (<code>String</code>) Secure hash information
     */
    public static String hash(String str) {
        return String.format("String:  %s\n  MD5:   %s\n  SHA1:  %s\n  CRC32: %s",
                             str, hash(str, "MD5"), hash(str, "SHA1"), hash(str, "CRC32"));
    } // public static String hash(String str)

    /**
     * Calculate secure hash value of a file
     * @param file      (<code>File</code>) The file to be hashed
     * @param algorithm (<code>String</code>) The secure hash algorithm
     * @return          (<code>String</code>) Secure hash value or error message
     */
    public static String hash(File file, String algorithm) {
        String info = null;
        try {
            FileInputStream input = new FileInputStream(file);
            if (algorithm.trim().equals("MD5") || algorithm.trim().equals("SHA1")) {
                MessageDigest md = MessageDigest.getInstance(algorithm);
                md.update(input.getChannel().map(FileChannel.MapMode.READ_ONLY, 0, file.length()));
                info = bufferToHex(md.digest());
            } else if (algorithm.trim().equals("CRC32")) {
                CheckedInputStream cis = new CheckedInputStream(input, new CRC32());
                byte[] buf = new byte[4096];
                while(cis.read(buf) >= 0) {};
                info = Long.toHexString(cis.getChecksum().getValue()).toUpperCase();
                cis.close();
            } else
                info = "N/A: Unsupported secure hash algorithm";
            input.close();
        } catch (Exception e) {
            return "N/A: " + e.getMessage();
        } // try - catch (Exception e)
        return info;
    } // public static String hash(File file, String algorithm)

    /**
     * Calculate secure hash value of a file
     * @param file  (<code>File</code>) The file to be hashed
     * @return      (<code>String</code>) Secure hash information
     */
    public static String hash(File file) {
        return String.format("File:    %s\n  MD5:   %s\n  SHA1:  %s\n  CRC32: %s",
                             file.getAbsolutePath(), hash(file, "MD5"),
                             hash(file, "SHA1"), hash(file, "CRC32"));
    } // public static String hash(File file)

    /**
     * Program main entry
     * @param args  (<code>String[]</code>) Command line arguments
     */
    public static void main(String[] args) {
        System.out.println(SecureHash.hash(new File("AVATAR.png")));
        System.out.println(SecureHash.hash("Hello World!"));
    } // public static void main(String[] args)

} // public final class SecureHash
