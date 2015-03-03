import java.io.*;

public class Task {

    public static void main(String[] args) throws IOException {

        Solve solve = new Solve();

        solve.init();
        solve.sortJuice();
        int n = 0;
        n = solve.washingUp();

        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(new File("juice3.out"))));

        out.print(n);
        out.flush();
    }
}
