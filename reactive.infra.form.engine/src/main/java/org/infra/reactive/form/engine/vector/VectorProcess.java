//package org.infra.reactive.form.engine.vector;
//
//import jdk.incubator.vector.FloatVector;
//import jdk.incubator.vector.VectorMask;
//import jdk.incubator.vector.VectorSpecies;
//
//public class VectorProcess {
//
//    static final VectorSpecies<Float> SPECIES = FloatVector.SPECIES_PREFERRED;
//
//    public static void main(String[] args) {
//        float[] a = new float[]{1, 2, 3, 4};
//        float[] b = new float[]{1, 2, 3, 4};
//        float[] c = new float[]{0, 0, 0, 0};
//        vectorMultiply(a, b, c);
//    }
//
//    public static void vectorMultiply(float[] a, float[] b, float[] c) {
//        // It is assumed array arguments are of the same size
//        for (int i = 0; i < a.length; i += SPECIES.length()) {
//            VectorMask<Float> m = SPECIES.indexInRange(i, a.length);
//            FloatVector va = FloatVector.fromArray(SPECIES, a, i, m);
//            FloatVector vb = FloatVector.fromArray(SPECIES, b, i, m);
//            FloatVector vc = va.mul(vb);
//            vc.intoArray(c, i, m);
//        }
//    }
//}
