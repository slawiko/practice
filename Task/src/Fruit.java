public class Fruit implements Comparable<Fruit> {

    public String fruit;
    public int num;

    public Fruit() {

        this.fruit = null;
        this.num = 0;
    }

    public Fruit(String fruit) {

        this.fruit = fruit;
        this.num = 0;
    }

    @Override
    public int compareTo(Fruit o) {

        return fruit.compareTo(o.fruit);
    }
}
