package com.ideas2it.po.repository;

import com.ideas2it.po.entity.POItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface POItemRepository extends JpaRepository<POItem, Long> {
} 