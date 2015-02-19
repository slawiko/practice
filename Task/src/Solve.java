import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Solve {

    List<Juice> juices;
    List<Fruit> allFruits;

    Solve() {

        this.juices = new ArrayList<Juice>();
        this.allFruits = new ArrayList<Fruit>();
    }

    public void init() throws IOException {

        BufferedReader bf = new BufferedReader(new InputStreamReader(new FileInputStream("input.txt"))); // поменять на in

        String tmp1;
        TreeSet<Fruit> allFruitsTemp = new TreeSet<Fruit>();

        while ((tmp1 = bf.readLine()) != null) {

            StringTokenizer st = new StringTokenizer(tmp1, " ");

            TreeSet<Fruit> fruitsTemp = new TreeSet<Fruit>();
            ArrayList<Fruit> fruitsTemp2 = new ArrayList<Fruit>();

            while (st.hasMoreTokens()) {

                String tmp2 = st.nextToken();
                Fruit fruit = new Fruit(tmp2);

                fruitsTemp.add(fruit);
                allFruitsTemp.add(fruit);
            }

            if (fruitsTemp.size() == 1) {

                Fruit fruit = new Fruit();
                fruit = fruitsTemp.first();
                allFruitsTemp.remove(fruit);
                fruit.monoFruit = true;
                allFruitsTemp.add(fruit);
            }

            fruitsTemp2.addAll(fruitsTemp);
            fruitsTemp.clear();

            Juice juice = new Juice(fruitsTemp2);
            juices.add(juice);
            fruitsTemp2.clear();
        }

        allFruits.addAll(allFruitsTemp);
    }

    public void sortJuice() {

        Collections.sort(juices, new Comparator<Juice>() {
            public int compare(Juice j1, Juice j2) {
                return j1.fruits.size() - j2.fruits.size();
            }
        });
    }

    public Solve freqFruits() {

        Solve solve = new Solve();

        for (Juice i : juices)
            for (Fruit k : i.fruits)                         //WARNING!!!! MONKEYCODE
                for (Fruit l : allFruits)
                    if (l.fruit.equals(k.fruit))
                        l.num++;

        for (Juice jus : juices) {

            ArrayList<Fruit> fruits = new ArrayList<Fruit>();
            solve.allFruits = allFruits;

            for (Fruit fr : jus.fruits)
                for (Fruit all : allFruits)
                    if (all.fruit.equals(fr.fruit))
                        fruits.add(all);

            Juice juice = new Juice();
            juice.fruits = fruits;
            solve.juices.add(juice);
        }

        return solve;
    }

    public void sortFruits() {

        /*for (Juice jus : juices) {

            Collections.sort(jus.fruits, new Comparator<Fruit>() {
                public int compare(Juice j1, Juice j2) {
                    return j1.fruits.size() - j2.fruits.size();
                }
            });
        }*/
    }




    //сортируем в каждом ArrayList<Juice> juices каждый Juice по принципу (чаще всего встречается, алфавит)
    /*
    * основное задание
    *
    *
    * */


}
