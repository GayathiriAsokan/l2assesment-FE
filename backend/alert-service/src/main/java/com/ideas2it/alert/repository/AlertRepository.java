package com.ideas2it.alert.repository;

import com.ideas2it.alert.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {
} 