import java.util.*;

public class Juice extends Fruit{

    public List<Fruit> fruits;

    public Juice () {

        this.fruits = new ArrayList<Fruit>();
    }

    public Juice (List<Fruit> fruits) {

        ArrayList<Fruit> fruitsTemp = new ArrayList<Fruit>(fruits);
        this.fruits = fruitsTemp;
    }
}
