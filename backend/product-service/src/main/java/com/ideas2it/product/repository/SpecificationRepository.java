package com.ideas2it.product.repository;

import com.ideas2it.product.entity.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecificationRepository extends JpaRepository<Specification, Long> {
} 