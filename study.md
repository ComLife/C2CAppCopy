Android jsbundle打包：react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res 

热更打包
code-push deployment ls C2C-Android -k
code-push deployment ls  C2C-Ios  -k

react-native bundle --platform android --entry-file index.js --bundle-output ./bundles/index.android.bundle
react-native bundle --platform ios --entry-file index.js --bundle-output ./bundles/index.ios.bundle

code-push release C2C-Android ./bundles/index.android.bundle 1.0.0 --deploymentName Production --description "1.测试112。" --mandatory true
code-push release C2C-Ios ./bundles/index.ios.bundle 1.0.0 --deploymentName Production --description "1.ios测试018。" --mandatory true

```c
http://game.kakaforfun.com/live/chiji/taptap/android/index.html
http://game.kakaforfun.com/live/chiji/appstore/index.html
选择法：单步：
	从数组中选出最大或最小的值，并交换
	void Choice(){
		int a[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
		int maxNum = a[0];
		for(int i=1;i<10;i++)
		{
			if(maxNum < a[i])
			{
				maxNum = a[i];
			}
		}
	}

	选择法的完整步骤：
	void Choice(){
		int a[10] = {10,5, 3, 6, 7, 1, 4, 9, 8, 2};
		for(int i = 0; i < 9; i++)
		{
			int maxIndex = i;
			for(int j = i+1; j < 10; j++)
			{
				if(a[j] < a[maxIndex])
				{
					maxIndex = j;
				}
			}
			if(i != maxIndex)
			{
				int temp = a[i];
				a[i] = a[maxIndex];
				a[maxIndex] = temp;
			}
		}
	}

冒泡法：单步：
	从数组中挨个遍历，并把最大值或最小值沉底
	void Bubbling()
	{
		int a[10] = {10,5, 3, 6, 7, 1, 4, 9, 8, 2};
		for(int i = 0; i < 10; i++)
		{
			if(a[i] > a[i+1]){
				int temp = a[i];
				a[i] = a[i+1];
				a[i+1] = temp;
			}
		}
	}

	//冒泡完整步骤
	void Bubbling()
	{
		int a[10] = {10, 5, 3, 6, 7, 1, 4, 9, 8, 2};
		for(int i = 0; i < 9; i++)
		{
			for(int j = i+1; j < 10; j++)
			{
				if(a[i] > a[j])
				{
					int temp = a[j];
					a[j] = a[i];
					a[i] = temp;
				}
			}
		}
	}

    斐波那契数组：
    a[i] = a[i-1]+a[i-2]

    //数组法
    void feibo()
    {
        int a[40];
        a[0] = 1;
        a[1] = 1;
        for(i=2;i<40;i++)
        {
            a[i] = a[i-1]+a[i-2];
        }
    }
    //递归法
    void feibo(i)
    {
        if( i = 1 || i = 2 )
        {
            return 1;
        }
        else
        {
            return feibo(i - 1) + feibo( i - 2);
        }
    }
```

二分查找与拉格朗日插值查找
	查找条件：必须是有序的
共同条件：按比例刷掉数据，二分查找是一次刷一半，拉格朗日插值查找是按照所给定的数据找需要的比例
二分查找的公式为: tou + (wei - tou) * 1 / 2;
拉格朗日插值查找公式为： tou + (wei - tou) * 1.0 (num - a[tou]) / (a[wei] - a[tou]);
举例:a[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};//这种方法太有序，所以可以一次找到。

插入排序法


int a[10] = {10, 5, 3, 6, 7, 1, 4, 9, 8, 2};
&a 代表取数组的地址， 类型为int *[10];
a  代表数组的第一个元素的地址， 类型为 int *;
int *p = a;
a++;错误，因为a是一个常量指针。
p++;正确，因为p是一个变量。
数组没有副本机制，作为参数退化为一个指针。

sizeof(*a) = 4;
sizeof(*&a) = 40;
sizeof(a) = 40; 这里取大小相当于sizeof(*&a)， 而不是按照sizeof(*a)去取大小。

printf ("%d", 8[a]); 8[a]相当于 *(a+8);

memset函数，malloc函数等操作内存的函数一般返回值都为void *类型，因为void *类型可以转换为任何类型的指针。

while((*dest++ = *source++) != '\0'); 相当于:
while(*source != '\0')
{
	*dest = *source;
	dest++;
	source++;
}

下次看：20150421

int *p;
p = &a;
p是地址，数据a的地址，*p是数据
同理 int **pp , pp是一级指针的地址，*pp是一级指针的值，也是一个地址，是数据的地址，**pp是一个值，即最终的数据

const int *p 与 int const *p一样， 都是不能改变数据，但是可以改变地址
int * const p 不能改变地址，但是可以改变数据，如何记忆：看const是在*号的左边还是在*的右边，const int *p 与 int const *p ，const都在*号的左边，而*p是一个数据，所以只能改变地址不能改变数据，反之亦然。
const int * const p 是既不能改变数据也不能改变地址。

结构体的浅拷贝与深拷贝
所谓浅拷贝就是编译器机械的拷贝变量1中的内容到变量2中，如果是指针变量只会拷贝指针变量中存放的地址并不会拷贝指针所指向的内存空间的内容
深拷贝需要自己实现拷贝指针所指向的内存空间的内容（只有指针需要自己实现呢内存空间的创建与内容的拷贝，其他各类型直接赋值）




//网址：https://www.cnblogs.com/chengxiao/p/6103002.html
```c
   /**
     * 交换数组元素
     * @param arr
     * @param a
     * @param b
     */
    public static void swap(int []arr,int a,int b){
        arr[a] = arr[a]+arr[b];
        arr[b] = arr[a]-arr[b];
        arr[a] = arr[a]-arr[b];
    }

   /**
     * 简单选择排序
     *
     * @param arr
     */
    public static void selectSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int min = i;//每一趟循环比较时，min用于存放较小元素的数组下标，这样当前批次比较完毕最终存放的就是此趟内最小的元素的下标，避免每次遇到较小元素都要进行交换。
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            //进行交换，如果min发生变化，则进行交换
            if (min != i) {
                swap(arr,min,i);
            }
        }
    } 


   /**
     * 冒泡排序
     *
     * @param arr
     */
    public static void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            boolean flag = true;//设定一个标记，若为true，则表示此次循环没有进行交换，也就是待排序列已经有序，排序已然完成。
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr,j,j+1);
                    flag = false;
                }
            }
            if (flag) {
                break;
            }
        }
    }


   /**
     * 插入排序
     *
     * @param arr
     */
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int j = i;
            while (j > 0 && arr[j] < arr[j - 1]) {
                swap(arr,j,j-1);
                j--;
            }
        }
    }

	  /**
      * 希尔排序 针对有序序列在插入时采用交换法
      * @param arr
      */
     public static void sort(int []arr){
         //增量gap，并逐步缩小增量
        for(int gap=arr.length/2;gap>0;gap/=2){
            //从第gap个元素，逐个对其所在组进行直接插入排序操作
            for(int i=gap;i<arr.length;i++){
                int j = i;
                while(j-gap>=0 && arr[j]<arr[j-gap]){
                    //插入排序采用交换法
                    swap(arr,j,j-gap);
                    j-=gap;
                }
            }
        }
     }
 
     /**
      * 希尔排序 针对有序序列在插入时采用移动法。
      * @param arr
      */
     public static void sort1(int []arr){
         //增量gap，并逐步缩小增量
         for(int gap=arr.length/2;gap>0;gap/=2){
             //从第gap个元素，逐个对其所在组进行直接插入排序操作
             for(int i=gap;i<arr.length;i++){
                 int j = i;
                 int temp = arr[j];
                 if(arr[j]<arr[j-gap]){
                     while(j-gap>=0 && temp<arr[j-gap]){
                         //移动法
                         arr[j] = arr[j-gap];
                         j-=gap;
                     }
                     arr[j] = temp;
                 }
             }
         }
     }
     /**
      * 交换数组元素
      * @param arr
      * @param a
      * @param b
      */
     public static void swap(int []arr,int a,int b){
         arr[a] = arr[a]+arr[b];
         arr[b] = arr[a]-arr[b];
         arr[a] = arr[a]-arr[b];
     }
 




   /**
     * 快速排序
     *
     * @param arr
     */
	void QuickSort(int* array,int left,int right)
	{
	    assert(array);
	    if(left >= right)//表示已经完成一个组
	    {
	        return;
	    }
	    int index = PartSort(array,left,right);//枢轴的位置
	    QuickSort(array,left,index - 1);
	    QuickSort(array,index + 1,right);
	}


	// 左右指针法
	// 选取一个关键字(key)作为枢轴，一般取整组记录的第一个数/最后一个，这里采用选取序列最后一个数为枢轴。
	// 设置两个变量left = 0;right = N - 1;
	// 从left一直向后走，直到找到一个大于key的值，right从后至前，直至找到一个小于key的值，然后交换这两个数。
	// 重复第三步，一直往后找，直到left和right相遇，这时将key放置left的位置即可。
	int PartSort(int* array,int left,int right)
	{
	    int& key = array[right];
	    while(left < right)
	    {
	        while(left < right && array[left] <= key)
	        {
	            ++left;
	        }
	        while(left < right && array[right] >= key)
	        {
	            --right;
	        }
	        swap(array[left],array[right]);
	    }
	    swap(array[left],key);
	    return left;
	}


	// 挖坑法
	// 选取一个关键字(key)作为枢轴，一般取整组记录的第一个数/最后一个，这里采用选取序列最后一个数为枢轴，也是初始的坑位。
	// 设置两个变量left = 0;right = N - 1;
	// 从left一直向后走，直到找到一个大于key的值，然后将该数放入坑中，坑位变成了array[left]。
	// right一直向前走，直到找到一个小于key的值，然后将该数放入坑中，坑位变成了array[right]。
	// 重复3和4的步骤，直到left和right相遇，然后将key放入最后一个坑位
	int PartSort(int* array,int left,int right)
	{
	    int key = array[right];
	    while(left < right)
	    {
	        while(left < right && array[left] <= key)
	        {
	            ++left;
	        }
	        array[right] = array[left];
	        while(left < right && array[right] >= key)
	        {
	            --right;
	        }
	        array[left] = array[right];  
	    }
	    array[right] = key;
	    return right;
	}


	// 前后指针法
	// 定义变量cur指向序列的开头，定义变量pre指向cur的前一个位置。
	// 当array[cur] < key时，cur和pre同时往后走，如果array[cur]>key，cur往后走，pre留在大于key的数值前一个位置。
	// 当array[cur]再次 < key时，交换array[cur]和array[pre]。
	// 通俗一点就是，在没找到大于key值前，pre永远紧跟cur，遇到大的两者之间机会拉开差距，中间差的肯定是连续的大于key的值，当再次遇到小于key的值时，交换两个下标对应的值就好了。
	int PartSort(int* array,int left,int right)
	{
	    if(left < right){
	        int key = array[right];
	        int cur = left;
	        int pre = cur - 1;
	        while(cur < right)
	        {
	            while(array[cur] < key && ++pre != cur)//如果找到小于key的值，并且cur和pre之间有距离时则进行交换。注意两个条件的先后位置不能更换，可以参照评论中的解释
	            {
	                swap(array[cur],array[pre]);
	            }
	            ++cur;
	        }
	        swap(array[++pre],array[right]);
	        return pre;
	    }
	    return -1;
	}

--------------------- 
作者：清枫若待佳人醉 
来源：CSDN 
原文：https://blog.csdn.net/qq_36528114/article/details/78667034 
版权声明：本文为博主原创文章，转载请附上博文链接！


//网址：https://www.cnblogs.com/skywang12345/p/3602369.html
/**
    * 归并排序：C 语言
    *
    * @author skywang
    * @date 2014/03/12
    */
   
   #include <stdio.h>
   #include <stdlib.h>
  
  // 数组长度
  #define LENGTH(array) ( (sizeof(array)) / (sizeof(array[0])) )
  
  /*
   * 将一个数组中的两个相邻有序区间合并成一个
   *
   * 参数说明：
   *     a -- 包含两个有序区间的数组
   *     start -- 第1个有序区间的起始地址。
   *     mid   -- 第1个有序区间的结束地址。也是第2个有序区间的起始地址。
   *     end   -- 第2个有序区间的结束地址。
   */
  void merge(int a[], int start, int mid, int end)
  {
      int *tmp = (int *)malloc((end-start+1)*sizeof(int));    // tmp是汇总2个有序区的临时区域
      int i = start;            // 第1个有序区的索引
      int j = mid + 1;        // 第2个有序区的索引
      int k = 0;                // 临时区域的索引
  
      while(i <= mid && j <= end)
      {
          if (a[i] <= a[j])
              tmp[k++] = a[i++];
          else
              tmp[k++] = a[j++];
      }
  
      while(i <= mid)
          tmp[k++] = a[i++];
  
      while(j <= end)
          tmp[k++] = a[j++];
  
      // 将排序后的元素，全部都整合到数组a中。
      for (i = 0; i < k; i++)
          a[start + i] = tmp[i];
  
      free(tmp);
  }
  
  /*
   * 归并排序(从上往下)
   *
   * 参数说明：
   *     a -- 待排序的数组
   *     start -- 数组的起始地址
   *     endi -- 数组的结束地址
   */
  void merge_sort_up2down(int a[], int start, int end)
  {
      if(a==NULL || start >= end)
          return ;
  
      int mid = (end + start)/2;
      merge_sort_up2down(a, start, mid); // 递归排序a[start...mid]
      merge_sort_up2down(a, mid+1, end); // 递归排序a[mid+1...end]
  
      // a[start...mid] 和 a[mid...end]是两个有序空间，
      // 将它们排序成一个有序空间a[start...end]
      merge(a, start, mid, end);
  }
  
  
  /*
   * 对数组a做若干次合并：数组a的总长度为len，将它分为若干个长度为gap的子数组；
   *             将"每2个相邻的子数组" 进行合并排序。
   *
   * 参数说明：
   *     a -- 待排序的数组
   *     len -- 数组的长度
   *     gap -- 子数组的长度
   */
  void merge_groups(int a[], int len, int gap)
  {
      int i;
      int twolen = 2 * gap;    // 两个相邻的子数组的长度
  
      // 将"每2个相邻的子数组" 进行合并排序。
      for(i = 0; i+2*gap-1 < len; i+=(2*gap))
      {
          merge(a, i, i+gap-1, i+2*gap-1);
      }
  
      // 若 i+gap-1 < len-1，则剩余一个子数组没有配对。
      // 将该子数组合并到已排序的数组中。
      if ( i+gap-1 < len-1)
      {
          merge(a, i, i + gap - 1, len - 1);
      }
 }
 
 /*
  * 归并排序(从下往上)
  *
  * 参数说明：
  *     a -- 待排序的数组
  *     len -- 数组的长度
  */
 void merge_sort_down2up(int a[], int len)
 {
     int n;
 
     if (a==NULL || len<=0)
         return ;
 
     for(n = 1; n < len; n*=2)
         merge_groups(a, len, n);
 }
 
 void main()
 {
     int i;
     int a[] = {80,30,60,40,20,10,50,70};
     int ilen = LENGTH(a);
 
     printf("before sort:");
     for (i=0; i<ilen; i++)
         printf("%d ", a[i]);
     printf("\n");
 
     merge_sort_up2down(a, 0, ilen-1);        // 归并排序(从上往下)
     //merge_sort_down2up(a, ilen);            // 归并排序(从下往上)
 
     printf("after  sort:");
     for (i=0; i<ilen; i++)
         printf("%d ", a[i]);
     printf("\n");
 }
```

<a></a>标签伪类有四种状态：
		1.初始状态
		2.被访问
		3.鼠标移动
		4.点击


a:link{ //初始状态
	
}
a:visited{ //被访问状态
	
}
a:hover{ //鼠标移动上去的状态
	
}
a:active{ //被点击之后的状态
	
}

 CodePush热更新详细接入教程 ：https://blog.csdn.net/qq_23414675/article/details/82356635
 CodePush热更新详细接入教程 ：https://www.jianshu.com/p/6a5e00d22723
 CodePush热更新详细接入教程 ：https://www.jianshu.com/p/93f659655a77
 CodePush热更新详细接入教程 ：https://blog.csdn.net/vv_bug/article/details/78105269
 coudePush配置自己的服务器  ：https://blog.csdn.net/u014041033/article/details/78487456


codePush手动更新网址：https://blog.csdn.net/qq_33323251/article/details/79437932




adb命令行：
//连接一台台同局域网下设备ip为192.168.0.123,端口号为5555的设备
adb connect 192.168.0.123:5555 

// 获取设备列表及设备状态
adb devices 

// 获取设备的连接状态
adb get-state

//开启adb服务和关闭adb服务
adb kill-server 
adb start-server

//安装一个apk
adb install xxx.apk //xxx.apk 需要为绝对路径，实际操作中直接将apk拖到终端中即可。

//重新安装此apk，但是保留原有的数据和缓存文件
adb install -r xxx.apk

//卸载apk(-k表示保留数据和缓存文件)
adb uninstall (-k)

//强制停止应用
adb shell am force-stop

//清除应用数据和缓存
adb shell pm clear

//获取序列号
adb get-serialno 

//查看设备型号
adb shell getprop ro.product.model 

//查看Android系统版本
adb shell getprop ro.build.version.release 

//查看屏幕密度
adb shell wm density 

//查看屏幕分辨率
adb shell wm size 

//adb pull 拷出文件
adb pull sdcard/simple.txt e:\
adb pull sdcard/simple.txt e:\rename.txt 重命名文件名

//adb push 拷入文件
adb push d:\nice.txt sdcard/ 拷贝本地文件到手机sd卡


// 组件can模拟对象：
1.react-native-modal-dropdown
2.react-native-modal

组件的内容编写顺序如下：
1.static 开头的类属性，如 defaultProps、propTypes。
2.构造函数，constructor。
3.getter/setter（还不了解的同学可以暂时忽略）。
4.组件生命周期。
5._ 开头的私有方法。
6.事件监听方法，handle*。
7.render*开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
8.render() 方法。


dva框架使用详解及Demo教程
https://www.jianshu.com/p/21f8ed30e761