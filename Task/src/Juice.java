import java.util.*;

public class Juice {

    private TreeSet<Fruit> fruits;
    private boolean flag;

    public Juice() {

        this.fruits = new TreeSet<Fruit>();
        this.flag = false;
    }

    public Juice(TreeSet<Fruit> fruits) {

        TreeSet<Fruit> fruitsTemp = new TreeSet<Fruit>(fruits);
        this.fruits = fruitsTemp;
        this.flag = false;
    }

    public Juice(TreeSet<Fruit> fruits, boolean flag) {

        TreeSet<Fruit> fruitsTemp = new TreeSet<Fruit>(fruits);
        this.fruits = fruitsTemp;
        this.flag = flag;
    }

    public boolean getFlag() {

        return this.flag;
    }

    public TreeSet<Fruit> getSet() {

        return this.fruits;
    }

    public void setFlag(boolean flag) {

        this.flag = flag;
    }
}