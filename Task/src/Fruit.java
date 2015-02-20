public class Fruit implements Comparable<Fruit> {

    protected String fruit;

    public Fruit() {

        this.fruit = null;
    }

    public Fruit(String fruit) {

        this.fruit = fruit;
    }

    @Override
    public int compareTo(Fruit fruit) {

        return this.fruit.compareTo(fruit.fruit);
    }
}
