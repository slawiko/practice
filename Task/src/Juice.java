import java.util.*;

public class Juice {

    public List<Fruit> fruits;

    public Juice () {

        this.fruits = new ArrayList<Fruit>();
    }

    public TreeSet<Fruit> tokenizer (String list) {

        StringTokenizer st = new StringTokenizer(list, " ");

        TreeSet<Fruit> allFruits = new TreeSet<Fruit>();
        TreeSet<Fruit> fruitsTemp = new TreeSet<Fruit>();

        while (st.hasMoreTokens()) {

            String tmp = st.nextToken();
            Fruit fruit = new Fruit(tmp);

            fruitsTemp.add(fruit);
            allFruits.add(fruit);
        }

        fruits.addAll(fruitsTemp);

        return allFruits;
    }


}
