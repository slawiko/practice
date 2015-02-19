public class Fruit implements Comparable<Fruit> {

    protected String fruit;
    protected int num;
    protected boolean monoFruit;

    public Fruit() {

        this.fruit = null;
        this.num = 0;
        this.monoFruit = false;
    }

    public Fruit(String fruit) {

        this.fruit = fruit;
        this.num = 0;
        this.monoFruit = false;
    }

    @Override
    public int compareTo(Fruit o) {

        return fruit.compareTo(o.fruit); //!!!!!
    }
}
