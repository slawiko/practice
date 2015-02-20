import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Solve {

    List<Juice> juices;

    Solve() {

        this.juices = new ArrayList<Juice>();
    }

    public void init() throws IOException {

        BufferedReader bf = new BufferedReader(new InputStreamReader(new FileInputStream("juice.in")));

        String tmp1;

        while ((tmp1 = bf.readLine()) != null) {

            StringTokenizer st = new StringTokenizer(tmp1, " ");

            TreeSet<Fruit> fruitsTemp = new TreeSet<Fruit>();

            while (st.hasMoreTokens()) {

                String tmp2 = st.nextToken();
                Fruit fruit = new Fruit(tmp2);

                fruitsTemp.add(fruit);
            }

            Juice juice = new Juice(fruitsTemp);
            juices.add(juice);
        }
    }

    public void sortJuice() {

        Collections.sort(juices, new Comparator<Juice>() {
            public int compare(Juice j1, Juice j2) {
                return j2.fruits.size() - j1.fruits.size();
            }
        });
    }

    public int washingUp() {

        for (Juice juice : juices)
            for (Juice juice1 : juices)
               if (juice != juice1)
                   if (juice.fruits.containsAll(juice1.fruits))
                       juice1.flag = true;

        int n = 0;

        for (Juice juice : juices)
            if (!juice.flag)
                n++;

        return n;
    }

    /**
     * тест, который программа не сможет пройти:
     *
     * banana strawberry
     * banana strawberry apple
     * apple strawberry
     *
     * из-за того, что в BSA содержится и BS и AS, но все равно, после AS надо мыть
     */
}
