import java.util.*;

public class Juice extends Fruit{

    public TreeSet<Fruit> fruits;
    public boolean flag;

    public Juice () {

        this.fruits = new TreeSet<Fruit>();
        this.flag = false;
    }

    public Juice (TreeSet<Fruit> fruits) {

        TreeSet<Fruit> fruitsTemp = new TreeSet<Fruit>(fruits);
        this.fruits = fruitsTemp;
        this.flag = false;
    }
}
