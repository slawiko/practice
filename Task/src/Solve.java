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

        BufferedReader bf = new BufferedReader(new InputStreamReader(new FileInputStream("input.txt")));

        String tmp;
        TreeSet<Fruit> allFruitsTemp = new TreeSet<Fruit>();

        while ((tmp = bf.readLine()) != null) {

            TreeSet<Fruit> temp;
            Juice juice = new Juice();
            temp = juice.tokenizer(tmp);

            allFruitsTemp.addAll(temp);

            juices.add(juice);
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

    public Solve sortFruit() {

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




    //сортируем в каждом ArrayList<Juice> juices каждый Juice по принципу (чаще всего встречается, алфавит)
    /*
    * основное задание
    *
    *
    * */


}
