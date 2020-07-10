package com.ztiany.base;

import android.app.Activity;
import android.view.View;

import com.ztiany.base.di.HasViewInjector;

import javax.inject.Inject;

import dagger.android.AndroidInjector;
import dagger.android.DispatchingAndroidInjector;

/**
 * @author Ztiany
 *         Email: ztiany3@gmail.com
 *         Date : 2017-05-23 10:54
 */
public class HomeAppContext extends AppContext implements HasViewInjector<View>{

    @Inject
    DispatchingAndroidInjector<Activity> dispatchingActivityInjector;
    @Inject
    DispatchingAndroidInjector<View> mViewDispatchingAndroidInjector;

    @Override
    public void onCreate() {
        super.onCreate();
        DaggerAppComponent.create().inject(this);
    }

    @Override
    public AndroidInjector<Activity> activityInjector() {
        return dispatchingActivityInjector;
    }

    @Override
    public AndroidInjector<View> viewInjector() {
        return mViewDispatchingAndroidInjector;
    }
}
