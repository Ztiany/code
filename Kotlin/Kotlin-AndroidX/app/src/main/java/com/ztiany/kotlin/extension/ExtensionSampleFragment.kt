package com.ztiany.kotlin.extension

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.ztiany.kotlin.R
import kotlinx.android.extensions.CacheImplementation
import kotlinx.android.extensions.ContainerOptions
import kotlinx.android.synthetic.main.fragment_extension_sample.*

/**
 *@author Ztiany
 *      Email: ztiany3@gmail.com
 *      Date : 2017-08-27 17:34
 */
@ContainerOptions(CacheImplementation.SPARSE_ARRAY) //指定缓存view的实现
class ExtensionSampleFragment : Fragment() {

    companion object {
        fun newInstance(user: User): Fragment {
            val fragment = ExtensionSampleFragment()
            val bundle = Bundle()
            bundle.putParcelable("User", user)
            fragment.arguments = bundle
            return fragment
        }
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        val user = arguments?.getParcelable<User>("User")
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? =
            inflater.inflate(R.layout.fragment_extension_sample, container, false)

    @SuppressLint("SetTextI18n")
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        extension_tv_name.text = "extension 演示"
        extension_rv_list.layoutManager = LinearLayoutManager(context)
        extension_rv_list.addItemDecoration(DividerItemDecoration(context, DividerItemDecoration.VERTICAL))
        extension_rv_list.adapter = SampleAdapter()
    }


}