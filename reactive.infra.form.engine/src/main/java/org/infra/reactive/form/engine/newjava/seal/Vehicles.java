package org.infra.reactive.form.engine.newjava.seal;

public class Vehicles {
    public abstract sealed class Vehicle permits Car, Truck {

        private final String registrationNumber;

        public Vehicle(String registrationNumber) {
            this.registrationNumber = registrationNumber;
        }

        public String getRegistrationNumber() {
            return registrationNumber;
        }

    }

    public non-sealed class Car extends Vehicle implements Service {

        private final int numberOfSeats;

        public Car(int numberOfSeats, String registrationNumber) {
            super(registrationNumber);
            this.numberOfSeats = numberOfSeats;
        }

        public int getNumberOfSeats() {
            return numberOfSeats;
        }

        @Override
        public int getMaxServiceIntervalInMonths() {
            return 12;
        }

    }

    public final class Truck extends Vehicle implements Service {

        private final int loadCapacity;

        public Truck(int loadCapacity, String registrationNumber) {
            super(registrationNumber);
            this.loadCapacity = loadCapacity;
        }

        public int getLoadCapacity() {
            return loadCapacity;
        }

        @Override
        public int getMaxServiceIntervalInMonths() {
            return 18;
        }

    }

    public sealed interface Service permits Car, Truck {

        int getMaxServiceIntervalInMonths();

        default int getMaxDistanceBetweenServicesInKilometers() {
            return 100000;
        }

    }
}
