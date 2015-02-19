import java.io.IOException;

public class Task {

    public static void main(String[] args) throws IOException {

        Solve solve = new Solve();

        solve.init();
        solve.sortJuice();
        solve = solve.sortFruit();


    }
}
