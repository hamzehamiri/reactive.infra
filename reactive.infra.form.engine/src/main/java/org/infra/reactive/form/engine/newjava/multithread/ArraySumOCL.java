package org.infra.reactive.form.engine.newjava.multithread;

import org.jocl.*;

import static org.jocl.CL.*;

public class ArraySumOCL {
    private static String programSourceAdd =
            "__kernel void " +
                    "sumKernel(__global const float *a," +
                    "             __global const float *b," +
                    "             __global float *c)" +
                    "{" +
                    "    int gid = get_global_id(0);" +
                    "    c[gid] = a[gid] + b[gid];" +
                    "}";

    private cl_context context;
    private cl_command_queue commandQueue;
    private cl_program program;
    private cl_kernel kernel;

    public cl_context getContext() {
        return context;
    }

    public cl_command_queue getCommandQueue() {
        return commandQueue;
    }

    public cl_program getProgram() {
        return program;
    }

    public cl_kernel getKernel() {
        return kernel;
    }

    public void clear() {
        clReleaseKernel(kernel);
        clReleaseProgram(getProgram());
        clReleaseCommandQueue(getCommandQueue());
        clReleaseContext(getContext());
    }

    public cl_kernel doProcessOCL(String kernelName, String programSource) {
        int platformIndex = 0;
        long deviceType = CL_DEVICE_TYPE_ALL;
        int deviceIndex = 0;

        // Enable exceptions and subsequently omit error checks in this sample
        CL.setExceptionsEnabled(true);

        // Obtain the number of platforms
        int[] numPlatformsArray = new int[1];
        clGetPlatformIDs(0, null, numPlatformsArray);
        int numPlatforms = numPlatformsArray[0];

        // Obtain a platform ID
        cl_platform_id[] platforms = new cl_platform_id[numPlatforms];
        clGetPlatformIDs(platforms.length, platforms, null);
        cl_platform_id platform = platforms[platformIndex];

        // Initialize the context properties
        cl_context_properties contextProperties = new cl_context_properties();
        contextProperties.addProperty(CL_CONTEXT_PLATFORM, platform);

        // Obtain the number of devices for the platform
        int[] numDevicesArray = new int[1];
        clGetDeviceIDs(platform, deviceType, 0, null, numDevicesArray);
        int numDevices = numDevicesArray[0];

        // Obtain a device ID
        cl_device_id[] devices = new cl_device_id[numDevices];
        clGetDeviceIDs(platform, deviceType, numDevices, devices, null);
        cl_device_id device = devices[deviceIndex];

        // Create a context for the selected device
        context = clCreateContext(contextProperties, 1, new cl_device_id[]{device}, null, null, null);

        // Create a command-queue for the selected device
        cl_queue_properties properties = new cl_queue_properties();
        commandQueue = clCreateCommandQueueWithProperties(context, device, properties, null);


        // Create the program from the source code
        program = clCreateProgramWithSource(context, 1, new String[]{programSource}, null, null);

        // Build the program
        clBuildProgram(program, 0, null, null, null, null);

        // Create the kernel
        kernel = clCreateKernel(program, kernelName, null);
        return kernel;
    }

    public void arraySum(int[] numbers) {
        long millisecond = System.currentTimeMillis();

        int n = 10000;
        float[] srcArrayA = new float[n];
        float[] srcArrayB = new float[n];
        float[] dstArray = new float[n];
        for (int i = 0; i < n; i++) {
            srcArrayA[i] = i;
            srcArrayB[i] = i;
        }

        Pointer srcA = Pointer.to(numbers);
        Pointer srcB = Pointer.to(numbers);
        Pointer dst = Pointer.to(dstArray);

        doProcessOCL("sumKernel", programSourceAdd);

        cl_mem srcMemA = clCreateBuffer(getContext(), CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR, Sizeof.cl_float * n, srcA, null);
        cl_mem srcMemB = clCreateBuffer(getContext(), CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR, Sizeof.cl_float * n, srcB, null);
        cl_mem dstMem = clCreateBuffer(getContext(), CL_MEM_READ_WRITE, Sizeof.cl_float * n, null, null);

        int a = 0;
        clSetKernelArg(kernel, a++, Sizeof.cl_mem, Pointer.to(srcMemA));
        clSetKernelArg(kernel, a++, Sizeof.cl_mem, Pointer.to(srcMemB));
        clSetKernelArg(kernel, a++, Sizeof.cl_mem, Pointer.to(dstMem));
        clear();

        // Set the work-item dimensions
        long[] global_work_size = new long[]{n};

        // Execute the kernel
        clEnqueueNDRangeKernel(commandQueue, kernel, 1, null, global_work_size, null, 0, null, null);

        // Read the output data
        clEnqueueReadBuffer(commandQueue, dstMem, CL_TRUE, 0, n * Sizeof.cl_float, dst, 0, null, null);

        // Release kernel, program, and memory objects
        clReleaseMemObject(srcMemA);
        clReleaseMemObject(srcMemB);
        clReleaseMemObject(dstMem);

        System.out.printf("Time Duration : %d", (System.currentTimeMillis() - millisecond));
    }
}
